from urllib.parse import quote

from app.config import Settings
from app.models.camera import Camera
from app.services import ffmpeg_service


def _camera(**overrides) -> Camera:
    defaults = dict(
        id="CAM-TEST-001",
        name="Test Camera",
        channel=1,
        nvr_model="CP-UNR-108F1",
        nvr_ip="10.0.0.5",
        port=554,
        username="admin",
        password="supersecret",
        stream_type="main",
    )
    defaults.update(overrides)
    return Camera(**defaults)


def test_settings_loads_from_env(monkeypatch):
    monkeypatch.setenv("NVR_HOST", "10.0.0.5")
    monkeypatch.setenv("NVR_USERNAME", "admin")
    monkeypatch.setenv("NVR_PASSWORD", "supersecret")
    settings = Settings()
    assert settings.nvr_host == "10.0.0.5"


def test_redacted_rtsp_url_hides_credentials():
    redacted = _camera().redacted_rtsp_url()
    assert "supersecret" not in redacted
    assert "admin" not in redacted
    assert "***:***" in redacted


def test_raw_rtsp_url_contains_credentials_for_internal_use_only():
    raw = _camera().rtsp_url()
    assert "admin:supersecret" in raw


def test_rtsp_url_uses_the_cameras_own_host_and_channel_not_global_settings():
    """Two Camera instances with different host/channel/subtype must build
    different URLs - this is the whole point of moving RTSP construction
    off of the single global Settings.rtsp_url()."""
    cam1 = _camera(channel=1, nvr_ip="192.168.1.245", stream_type="main")
    cam2 = _camera(channel=3, nvr_ip="192.168.1.246", stream_type="sub")

    assert cam1.rtsp_url() != cam2.rtsp_url()
    assert "channel=1" in cam1.rtsp_url() and "subtype=0" in cam1.rtsp_url()
    assert "192.168.1.245" in cam1.rtsp_url()
    assert "channel=3" in cam2.rtsp_url() and "subtype=1" in cam2.rtsp_url()
    assert "192.168.1.246" in cam2.rtsp_url()


def test_rtsp_url_identical_for_channel_1s_plain_credentials():
    """Channel 1's known-working credentials contain no special characters,
    so percent-encoding them must be a no-op - the URL FFmpeg receives for
    the existing working stream must not change."""
    cam = _camera(
        username="admin", password="Admin123",
        nvr_ip="192.168.1.245", port=554, channel=1, stream_type="main",
    )
    assert cam.rtsp_url() == (
        "rtsp://admin:Admin123@192.168.1.245:554/cam/realmonitor"
        "?channel=1&subtype=0"
    )


def test_rtsp_url_percent_encodes_at_sign_in_password():
    cam = _camera(username="admin", password="Admin@123")
    url = cam.rtsp_url()
    assert "Admin%40123" in url
    assert "Admin@123" not in url


def test_rtsp_url_percent_encodes_colon_slash_hash_in_credentials():
    """':', '/' and '#' are all URL-structural characters - unencoded in
    the userinfo section they'd be parsed as delimiters, not credential
    bytes, and silently corrupt the URL FFmpeg connects to."""
    username = "us:er/name#1"
    password = "pa:ss/word#2"
    cam = _camera(username=username, password=password)
    url = cam.rtsp_url()

    assert username not in url
    assert password not in url
    expected = f"rtsp://{quote(username, safe='')}:{quote(password, safe='')}@10.0.0.5:554"
    assert url.startswith(expected)


def test_rtsp_url_does_not_encode_host_port_or_query_string():
    """Only the credentials are user-supplied; host/port/query are not and
    must be left untouched - encoding them would break the URL."""
    cam = _camera(username="admin", password="pw", nvr_ip="192.168.1.245", port=554, channel=2, stream_type="sub")
    url = cam.rtsp_url()
    assert url.endswith("192.168.1.245:554/cam/realmonitor?channel=2&subtype=1")


def test_ffmpeg_available_false_for_bogus_path():
    assert ffmpeg_service.ffmpeg_available("this-binary-does-not-exist-xyz") is False


def test_ffmpeg_available_true_for_common_shell_builtin():
    # `python3` (or `python`) should exist in virtually any dev/CI environment
    # and is a reasonable stand-in to prove the PATH lookup itself works.
    import shutil

    interpreter = shutil.which("python3") or shutil.which("python")
    if interpreter is None:
        return  # nothing suitable to assert against in this environment
    assert ffmpeg_service.ffmpeg_available(interpreter) is True
