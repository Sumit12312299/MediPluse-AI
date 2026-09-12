# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in MediPulse AI, please **do not** open a public GitHub issue.

Instead, please report it responsibly:

1. Email the maintainer at **security@medipulse.ai** with subject `[SECURITY] <brief description>`.
2. Include steps to reproduce, impact assessment, and any suggested fixes.
3. You will receive an acknowledgement within 48 hours.
4. We aim to release a patch within 7 days of a confirmed vulnerability.

## Security Considerations

- All API endpoints are protected with JWT-based authentication.
- Patient data is stored encrypted at rest.
- No credentials or API keys should ever be committed to source control -- use `.env` files.
- Medical records adhere to HIPAA-equivalent data isolation practices.
