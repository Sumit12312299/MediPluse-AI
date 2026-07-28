"""
Hospital Application Configuration.
Manages application lifecycle and configuration settings for the hospital module.
"""
from django.apps import AppConfig


class HospitalConfig(AppConfig):
    """Configuration class for the Hospital Django application."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hospital'

