import pytest

from app.services.camera_service import (
    PRIMARY_CAMERA_ID,
    CameraChannelTakenError,
    get_camera_service,
)
from app.services.stream_service import get_stream_manager


def test_list_cameras_returns_primary_camera(client):
    resp = client.get("/api/cameras")
    assert resp.status_code == 200
    body = resp.json()
    ids = [c["id"] for c in body["cameras"]]
    assert PRIMARY_CAMERA_ID in ids


def test_list_cameras_never_exposes_credentials(client):
    resp = client.get("/api/cameras")
    raw = resp.text.lower()
    assert "password" not in raw
    assert "rtsp://" not in raw


def test_get_known_camera(client):
    resp = client.get(f"/api/cameras/{PRIMARY_CAMERA_ID}")
    assert resp.status_code == 200
    body = resp.json()
    assert body["id"] == PRIMARY_CAMERA_ID
    assert "nvrIp" in body
    assert "password" not in body


def test_get_unknown_camera_returns_404(client):
    resp = client.get("/api/cameras/CAM-DOES-NOT-EXIST")
    assert resp.status_code == 404


def test_camera_status_before_stream_requested_is_offline(client):
    resp = client.get(f"/api/cameras/{PRIMARY_CAMERA_ID}/status")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "offline"


def test_camera_status_unknown_camera_404(client):
    resp = client.get("/api/cameras/CAM-DOES-NOT-EXIST/status")
    assert resp.status_code == 404


# -- Runtime registry: add/remove cameras ------------------------------------


def _create_payload(**overrides) -> dict:
    payload = dict(
        name="Test Channel 5",
        channel=5,
        host="192.168.1.250",
        port=554,
        username="admin",
        password="s3cret",
        streamType="sub",
    )
    payload.update(overrides)
    return payload


def test_create_camera_returns_201_with_detail(client):
    resp = client.post("/api/cameras", json=_create_payload())
    try:
        assert resp.status_code == 201
        body = resp.json()
        assert body["id"] == "CAM-CPPLUS-005"
        assert body["channel"] == 5
        assert body["nvrIp"] == "192.168.1.250"
        # Confirms the streamType alias round-trips correctly on input, not
        # just output - a default-value coincidence would hide a broken
        # input alias here, so this deliberately uses a non-default value.
        assert body["streamType"] == "sub"
        assert body["verified"] is False
    finally:
        client.delete("/api/cameras/CAM-CPPLUS-005")


def test_create_camera_never_echoes_credentials(client):
    resp = client.post("/api/cameras", json=_create_payload())
    try:
        raw = resp.text.lower()
        assert "s3cret" not in raw
        assert "password" not in raw
        assert "username" not in raw
        assert "rtsp://" not in raw
    finally:
        client.delete("/api/cameras/CAM-CPPLUS-005")


def test_create_camera_persists_and_appears_in_list(client):
    resp = client.post("/api/cameras", json=_create_payload())
    camera_id = resp.json()["id"]
    try:
        list_resp = client.get("/api/cameras")
        assert camera_id in [c["id"] for c in list_resp.json()["cameras"]]
    finally:
        client.delete(f"/api/cameras/{camera_id}")


def test_create_camera_duplicate_channel_returns_409(client):
    resp = client.post("/api/cameras", json=_create_payload(channel=1, host="192.168.1.245"))
    assert resp.status_code == 409
    assert "channel" in resp.json()["detail"].lower()


def test_create_camera_out_of_range_channel_rejected(client):
    resp = client.post("/api/cameras", json=_create_payload(channel=9))
    # Rejected either by request-schema validation (422) or service-layer
    # validation (400) - either way it must never be accepted.
    assert resp.status_code in (400, 422)


def test_delete_camera_returns_204_and_removes_it(client):
    create_resp = client.post("/api/cameras", json=_create_payload())
    camera_id = create_resp.json()["id"]

    del_resp = client.delete(f"/api/cameras/{camera_id}")
    assert del_resp.status_code == 204

    get_resp = client.get(f"/api/cameras/{camera_id}")
    assert get_resp.status_code == 404


def test_delete_unknown_camera_returns_404(client):
    resp = client.delete("/api/cameras/CAM-DOES-NOT-EXIST")
    assert resp.status_code == 404


def test_delete_camera_stops_its_running_stream(client):
    create_resp = client.post("/api/cameras", json=_create_payload())
    camera_id = create_resp.json()["id"]

    # Trigger a stream (FFmpeg isn't installed in CI, so this lands in an
    # "error" state, but a StreamHandle is still registered - exactly what
    # we want to confirm gets cleaned up).
    stream_resp = client.get(f"/api/cameras/{camera_id}/stream")
    assert stream_resp.status_code == 200
    assert get_stream_manager().get_handle(camera_id) is not None

    del_resp = client.delete(f"/api/cameras/{camera_id}")
    assert del_resp.status_code == 204
    assert get_stream_manager().get_handle(camera_id) is None


def test_removed_channel_can_be_re_added(client):
    """After deletion the channel is free again, not permanently burned."""
    first = client.post("/api/cameras", json=_create_payload())
    assert first.status_code == 201
    client.delete("/api/cameras/CAM-CPPLUS-005")

    second = client.post("/api/cameras", json=_create_payload(name="Re-added"))
    try:
        assert second.status_code == 201
    finally:
        client.delete("/api/cameras/CAM-CPPLUS-005")


def test_camera_service_add_camera_rejects_out_of_range_channel():
    service = get_camera_service()
    with pytest.raises(ValueError):
        service.add_camera(
            name="Bad", channel=0, host="10.0.0.1", port=554,
            username="", password="", stream_type="main",
        )
    with pytest.raises(ValueError):
        service.add_camera(
            name="Bad", channel=9, host="10.0.0.1", port=554,
            username="", password="", stream_type="main",
        )


def test_camera_service_add_camera_rejects_duplicate_channel():
    service = get_camera_service()
    with pytest.raises(CameraChannelTakenError):
        service.add_camera(
            name="Dup", channel=1, host="10.0.0.1", port=554,
            username="", password="", stream_type="main",
        )
