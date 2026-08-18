from app.services.camera_service import PRIMARY_CAMERA_ID


def test_stream_endpoint_unknown_camera_404(client):
    resp = client.get("/api/cameras/CAM-DOES-NOT-EXIST/stream")
    assert resp.status_code == 404


def test_stream_endpoint_response_shape(client):
    """FFmpeg is not installed in this test environment, so the stream
    manager should report a clean 'error' status (missing FFmpeg) rather
    than crash - this exercises the response schema end-to-end."""
    resp = client.get(f"/api/cameras/{PRIMARY_CAMERA_ID}/stream")
    assert resp.status_code == 200
    body = resp.json()
    assert body["cameraId"] == PRIMARY_CAMERA_ID
    assert body["streamType"] == "hls"
    assert body["streamUrl"] == f"/api/streams/{PRIMARY_CAMERA_ID}/index.m3u8"
    assert body["status"] in {"starting", "online", "offline", "error"}
    # No RTSP URL or credentials leaked in the stream response.
    assert "rtsp://" not in resp.text
    assert "test-pass" not in resp.text


def test_stream_response_never_contains_credentials(client):
    resp = client.get(f"/api/cameras/{PRIMARY_CAMERA_ID}/stream")
    assert "test-user" not in resp.text
    assert "test-pass" not in resp.text


def test_playlist_not_ready_returns_503_before_first_request(client):
    resp = client.get(f"/api/streams/{PRIMARY_CAMERA_ID}/index.m3u8")
    assert resp.status_code in (503, 200)  # 200 only if a prior test started it


def test_playlist_unknown_camera_404(client):
    resp = client.get("/api/streams/CAM-DOES-NOT-EXIST/index.m3u8")
    assert resp.status_code == 404


def test_segment_path_traversal_rejected(client):
    resp = client.get(f"/api/streams/{PRIMARY_CAMERA_ID}/..%2F..%2Fapp%2Fmain.py")
    assert resp.status_code in (400, 404)


def test_segment_invalid_extension_rejected(client):
    resp = client.get(f"/api/streams/{PRIMARY_CAMERA_ID}/evil.py")
    assert resp.status_code == 400
