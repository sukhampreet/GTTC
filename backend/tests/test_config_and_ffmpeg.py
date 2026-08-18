from app.config import Settings
from app.services import ffmpeg_service


def test_settings_loads_from_env(monkeypatch):
    monkeypatch.setenv("NVR_HOST", "10.0.0.5")
    monkeypatch.setenv("NVR_USERNAME", "admin")
    monkeypatch.setenv("NVR_PASSWORD", "supersecret")
    settings = Settings()
    assert settings.nvr_host == "10.0.0.5"


def test_redacted_rtsp_url_hides_credentials():
    settings = Settings(NVR_USERNAME="admin", NVR_PASSWORD="supersecret")
    redacted = settings.redacted_rtsp_url()
    assert "supersecret" not in redacted
    assert "admin" not in redacted
    assert "***:***" in redacted


def test_raw_rtsp_url_contains_credentials_for_internal_use_only():
    settings = Settings(NVR_USERNAME="admin", NVR_PASSWORD="supersecret")
    raw = settings.rtsp_url()
    assert "admin:supersecret" in raw


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
