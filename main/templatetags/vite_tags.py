import json
from django import template
from django.conf import settings
from pathlib import Path

register = template.Library()

@register.simple_tag
def vite_asset(entrypoint, asset_type="js"):
    manifest_path = Path(settings.BASE_DIR) / 'staticfiles' / '.vite' / 'manifest.json'

    if not manifest_path.exists():
        return ''

    with open(manifest_path, 'r') as f:
        manifest = json.load(f)

    data = manifest.get(entrypoint)

    if not data:
        return ''

    if asset_type == "js":
        return settings.STATIC_URL + data["file"]
    elif asset_type == "css":
        css_files = data.get("css", [])
        return settings.STATIC_URL + css_files[0] if css_files else ''

    return ''
