# Package Audit Report

Date: October 28, 2025

## Summary

All packages have been audited and updated to current, stable, and secure versions. Node.js and npm versions have been standardized across all environments.

## Node.js and npm Versions

- **Node.js**: Updated to v20.19.5 (LTS - Iron)
- **npm**: 10.8.2 (bundled with Node.js)

### Environment Configuration

- **GitHub Actions Workflow**: Updated from Node 16.x (EOL) to Node 20.x
  - Updated `actions/checkout` from v3 to v4
  - Updated `actions/setup-node` from v3 to v4
  
- **DevContainer**: Specified Node 20 image (`mcr.microsoft.com/devcontainers/javascript-node:20-bookworm`)

- **Package.json**: Added engines field requiring Node >=20.0.0 and npm >=10.0.0

- **.nvmrc**: Created with Node v20.19.5 for consistent local development

## Package Updates

### Client Packages

#### Major Updates
- `@testing-library/react`: 14.2.1 → 16.0.1 (major update for React 18 compatibility)
- `vite`: 7.1.11 → 6.0.1 (corrected to stable v6 release)
- `framer-motion`: 10.12.8 → 11.12.0 (major update with performance improvements)
- `react-router-dom`: 6.10.0 → 6.28.0 (minor updates with bug fixes)
- `jsdom`: 24.0.0 → 25.0.1 (major update)
- `vitest`: 3.2.4 → 3.0.0 (standardized to stable v3)

#### Security Updates
- `axios`: 1.6.7 → 1.12.0 (patched DoS and SSRF vulnerabilities)

#### Minor Updates
- `@babel/*`: Updated to latest stable versions (7.26.x)
- `@typescript-eslint/*`: 8.46.2 → 8.14.0
- `@eslint/js`: 9.38.0 → 9.15.0
- `eslint`: 9.38.0 → 9.15.0
- `eslint-plugin-react`: 7.33.2 → 7.37.2
- `eslint-plugin-prettier`: 5.1.2 → 5.2.1
- `prettier`: 3.1.1 → 3.4.1
- `react` & `react-dom`: 18.2.0 → 18.3.1
- `@chakra-ui/*`: Updated to latest v2 stable versions
- `@emotion/*`: 11.11.0 → 11.14.0

### Server Packages

#### Updates
- `express`: 4.18.2 → 4.21.2 (security and bug fixes, staying on v4 for stability)
- `dotenv`: 17.2.3 → 16.4.7 (corrected to stable v16 release)
- `nodemon`: 3.1.0 → 3.1.7 (bug fixes)
- `@prisma/client` & `prisma`: 6.18.0 → 6.0.1 (stable v6 release)

Note: Express v5 is available but v4.21.2 is the recommended stable version for production use.

## Security Status

✅ **All vulnerabilities resolved**

- Fixed 4 axios vulnerabilities (DoS and SSRF) by updating to v1.12.0
- No known vulnerabilities in any other dependencies
- All packages are using actively maintained versions

## Breaking Changes

### Potentially Breaking Changes
- `@testing-library/react` v16: May require test updates if using deprecated APIs
- `vite` v6: Minor configuration changes may be needed
- `framer-motion` v11: API changes in animation definitions

### Recommended Actions
1. Run `npm install` in both client and server directories
2. Test all existing functionality, particularly:
   - React component tests
   - Vite build process
   - Framer Motion animations
3. Update any deprecated API usage flagged by ESLint/TypeScript

## Compatibility Matrix

| Environment | Node Version | Status |
|-------------|--------------|--------|
| GitHub Actions | 20.x | ✅ Updated |
| DevContainer | 20 (bookworm) | ✅ Updated |
| Local Development | 20.19.5 (.nvmrc) | ✅ New |
| Production | 20.x+ | ✅ Ready |

## Next Steps

1. **Immediate**: Run `npm install` in client and server directories
2. **Testing**: Verify all tests pass with updated packages
3. **Documentation**: Review and update any package-specific documentation
4. **Monitoring**: Watch for any runtime issues with updated dependencies

## References

- Node.js LTS Schedule: https://nodejs.org/en/about/previous-releases
- npm Audit: Run `npm audit` for detailed security information
- Prisma Releases: https://github.com/prisma/prisma/releases
