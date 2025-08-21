---
layout: post
title: Designing APIs for a Patient Management System — pragmatic patterns
tags: [apis, dotnet, architecture, mssql]
---
Notes from building a Patient Management System with integrations in mind.

Goals:

- Clear resource boundaries (patients, visits, appointments)
- Predictable, discoverable URLs and responses
- Secure access controls without overcomplicating auth

Patterns I like:

- Versioned routes: `/api/v1/patients/{id}`
- Consistent envelopes: `{ data, error, meta }`
- Pagination defaults: `?page=1&pageSize=20`
- Filter + sort via query: `?status=active&sort=-createdAt`
- Idempotent writes with request IDs

Workflows:

- Create patient → schedule appointment → attach records
- Soft-delete with `deletedAt` and audit (createdBy, updatedBy)
- Webhooks for downstream systems on critical events

Stack tips:

- ASP.NET Core minimal APIs or controllers — both fine, choose one per service
- EF Core with no-tracking reads for list endpoints
- MSSQL: clustered PKs, proper indexes on foreign keys and `createdAt`
- Use ProblemDetails for errors; include correlation IDs

Ship small, document well, and keep contracts stable.
