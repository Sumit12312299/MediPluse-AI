"""
Hospital Application Configuration.
Manages application lifecycle and configuration settings for the hospital module.
"""
from django.apps import AppConfig


class HospitalConfig(AppConfig):
    """Configuration class for the Hospital Django application."""
    # Define primary key auto-increment field type to avoid migration deprecations.
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hospital'

