from app.services.camera_service import PRIMARY_CAMERA_ID


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
