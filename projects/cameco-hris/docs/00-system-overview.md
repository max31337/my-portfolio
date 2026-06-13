# System Overview - CAMECO HRIS

## Executive Summary

The **SyncingSteel HRIS** is an on-premise Human Resources Information System designed for mid to large-scale organizations requiring comprehensive workforce management, payroll processing, and government compliance tracking.

**System Name**: CAMECO HRIS (Complete Automated Management of Employee Contributions and Operations)  
**Deployment**: On-premise (company server, internal use only)  
**Users**: Office staff with role-based access control  
**Primary Functions**: Employee Management, Payroll, Compliance, Timekeeping, Leave Management  

---

## System Architecture

### High-Level Components

```
┌─────────────────────────────────────────────────────┐
│              CAMECO HRIS Platform                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │   ATS &  │  │ Workforce│  │ Payroll &│         │
│  │ Hiring   │  │Management│  │Compliance│         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │Timekeeping│ │Leave     │  │Performance│        │
│  │& RFID    │  │Management│  │ Appraisal│         │
│  └──────────┘  └──────────┘  └──────────┘         │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │    PostgreSQL Database + Event Ledger        │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Core Modules

| Module | Purpose | Owner | Key Processes |
|--------|---------|-------|----------------|
| **ATS & Recruitment** | Job posting to hiring | HR Staff | Job posting, applicant tracking, interviews, offers |
| **Employee Management** | Personnel records | HR Staff | Employee profiles, documents, employment contracts |
| **Onboarding** | Hire to active employee | HR Staff | Document collection, access provisioning, probation |
| **Workforce Management** | Scheduling & assignments | HR Staff | Schedules, rotations, conflict resolution |
| **Timekeeping** | Attendance & RFID | HR Staff | Clock in/out, RFID events, corrections |
| **Leave Management** | Time off requests | HR Staff (input), HR Manager (approval) | Leave requests, approvals, balance tracking |
| **Overtime** | Extra hours tracking | HR Staff (input), HR Manager (approval) | Overtime requests, approvals, reconciliation |
| **Performance Management** | Employee reviews | HR Manager (approval) | Appraisal cycles, ratings, feedback |
| **Payroll Processing** | Salary calculation | Payroll Officer | Deductions, benefits, calculations, reconciliation |
| **Payment Distribution** | Salary disbursement | Payroll Officer | Cash envelopes, bank transfers, e-wallets |
| **Government Compliance** | Tax & social security filings | Payroll Officer | SSS, PhilHealth, Pag-IBIG, BIR filings |

---

## User Roles & Responsibilities

### 1. Superadmin
**Access Level**: Full system access  
**Primary Responsibility**: System health, security, emergency management

**Key Capabilities**:
- Monitor system performance and uptime
- Manage user accounts and reset passwords
- Access audit logs and security events
- Override any system process in emergencies
- Backup and disaster recovery management
- Monitor ledger integrity and replay backlog

**Module Access**:
- System Management (Full)
- Emergency override on all modules

---

### 2. Office Admin
**Access Level**: Configuration & setup  
**Primary Responsibility**: Company setup and business rules

**Key Capabilities**:
- Configure company information and structure
- Define pay grades and salary structures
- Set leave types and entitlements
- Define business rules and workflows
- Configure integration parameters
- View system analytics and reports

**Module Access**:
- Company Setup (Full)
- Business Rules (Full)
- Employee Management (View only)
- Reports (Full)

---

### 3. HR Manager
**Access Level**: Approval and oversight  
**Primary Responsibility**: Review and approve HR workflows

**Key Capabilities**:
- Approve leave requests
- Review and approve overtime
- Approve employee evaluations
- Monitor timekeeping and attendance
- Escalate issues to Superadmin
- View department-level analytics

**Module Access**:
- Leave Management (Approve)
- Overtime (Approve)
- Performance Management (Approve)
- Timekeeping (View)
- Employee Management (View)
- Reports (View)

---

### 4. HR Staff
**Access Level**: Day-to-day operations  
**Primary Responsibility**: Core HR and administrative tasks

**Key Capabilities**:
- Post jobs and manage ATS
- Create and update employee records
- Process onboarding documentation
- Input attendance and timekeeping corrections
- Submit leave and overtime requests
- Manage workforce schedules
- Prepare employee for payroll processing
- Input performance appraisals

**Module Access**:
- ATS & Recruitment (Full)
- Employee Management (Full)
- Onboarding (Full)
- Timekeeping (Full, including corrections)
- Workforce Management (Full)
- Leave Management (Input)
- Overtime (Input)
- Performance Management (Input)

---

### 5. Payroll Officer
**Access Level**: Payroll and compliance  
**Primary Responsibility**: Payroll processing and government filings

**Key Capabilities**:
- Process monthly payroll
- Calculate deductions and benefits
- Reconcile payroll entries
- Distribute salaries (cash, bank, e-wallet)
- File government remittances
- Generate payroll reports
- Audit payroll changes
- Monitor payment reconciliation

**Module Access**:
- Payroll Processing (Full)
- Payment Distribution (Full)
- Government Compliance (Full)
- Employee Management (View)
- Timekeeping (View)
- Reports (Full)

---

## Data Flow & Integration Points

### RFID Timekeeping Integration

```
RFID Card Tap
    ↓
Edge Device (RFID Reader)
    ↓
Event Bus
    ↓
PostgreSQL Ledger (rfid_ledger)
    ↓
├─ Timekeeping Module (HH:MM updates)
├─ Payroll Module (attendance for salary calc)
├─ Leave Management (absence tracking)
└─ Monitoring (alerts, discrepancies)
```

**Ledger Features**:
- Immutable event log with sequence numbers
- Hash chain verification for integrity
- Replay monitoring and gap detection
- Automatic alerting on ledger anomalies

---

### ATS Integration

**Current Sources**:
- Facebook job posting sync
- In-person applications (manual entry)

**Future Sources**:
- Public job board integration
- Email application capture

**Data Flow**:
```
Job Posting → Applicant → Interview → Offer → Hire
                          ↓
                    Employee Management
```

---

### Payment Integration

**Current Methods**:
- **Cash Distribution**: HR Staff prepares envelopes, Payroll Officer distributes
- Process: Payroll → Envelope Prep → Release → Reconciliation

**Future Methods**:
- **Bank Transfer**: Direct deposit to employee accounts
- **E-Wallet**: Mobile wallet integration for digital disbursement

---

## Access Control Matrix

### By Module

| Module | Superadmin | Office Admin | HR Manager | HR Staff | Payroll Officer |
|--------|:----------:|:----------:|:----------:|:----------:|:----------:|
| System Management | ✓ Full | ✗ | ✗ | ✗ | ✗ |
| Company Setup | Emergency | ✓ Full | ✗ | ✗ | ✗ |
| Business Rules | Emergency | ✓ Full | ✗ | ✗ | ✗ |
| Employee Management | Emergency | View | View | ✓ Full | View |
| ATS/Recruitment | Emergency | View | View | ✓ Full | ✗ |
| Onboarding | Emergency | View | Approve | ✓ Full | ✗ |
| Timekeeping | Emergency | View | View | ✓ Full | View |
| Workforce Management | Emergency | View | Review | ✓ Full | ✗ |
| Leave Management | Emergency | View | Approve | Input | ✗ |
| Overtime | Emergency | View | Approve | Input | ✗ |
| Performance Management | Emergency | View | Approve | Input | ✗ |
| Payroll Processing | Emergency | View | ✗ | ✗ | ✓ Full |
| Payment Distribution | Emergency | View | ✗ | ✗ | ✓ Full |
| Government Compliance | Emergency | View | ✗ | ✗ | ✓ Full |
| Reports | Emergency | ✓ Full | View | ✓ Dept | ✓ Payroll |

**Legend**:
- ✓ Full = Complete access
- View = Read-only access
- Input = Data entry only (no approval)
- Approve = Approval authority
- Emergency = Superadmin override only
- ✗ = No access

---

## Data Security & Audit Trail

### Immutable Ledger System

The system maintains an **event ledger** for all critical transactions:
- RFID timekeeping events
- Payroll calculations
- Leave and overtime approvals
- System changes and overrides

**Features**:
- Sequential event numbering
- Cryptographic hash chain
- Replay verification
- Automatic anomaly detection
- Complete audit trail

### Monitoring Requirements

All staff must regularly monitor:
- **Ledger commit latency** (how quickly events are recorded)
- **Sequence gaps** (missing event numbers)
- **Hash mismatches** (data integrity issues)
- **Replay backlog** (unprocessed events)

Before executing dependent tasks (e.g., payroll calculation), verify ledger health.

---

## System Workflows Overview

### 1. Hiring & Interview (HR Staff)
- Create job posting
- Track applicants
- Schedule interviews
- Process job offers
- Create employee record

**Approval Required**: HR Manager (final offer approval)

---

### 2. Employee Onboarding (HR Staff)
- Collect onboarding documents
- Setup system access
- Assign initial schedule
- Start probation period (typically 3-6 months)
- Conduct probation evaluation

**Approval Required**: HR Manager (probation completion)

---

### 3. Daily Timekeeping (HR Staff)
- RFID card tap (automatic)
- View daily clock in/out
- Submit paper corrections
- Monitor attendance patterns

**Review Required**: HR Manager (overtime approval)

---

### 4. Leave Request (HR Staff → HR Manager)
- Submit leave request with reason
- System calculates leave balance
- HR Manager reviews and approves
- HR Manager or Superadmin can reject
- Approved leaves appear on payroll

**Approval Chain**: HR Staff submits → HR Manager approves

---

### 5. Overtime Request (HR Staff → HR Manager)
- Submit overtime hours with reason
- HR Manager reviews actual hours worked
- HR Manager approves or rejects
- Approved overtime added to payroll

**Approval Chain**: HR Staff submits → HR Manager approves

---

### 6. Monthly Payroll (Payroll Officer)
- Lock employee data from changes
- Verify timekeeping data (check ledger)
- Verify leave and overtime approvals
- Calculate salaries and deductions
- Generate payroll report
- Distribute payments (cash/bank/e-wallet)

**Verification Required**: Check RFID ledger, leave/OT approvals, employee data

---

### 7. Government Remittances (Payroll Officer)
- Calculate SSS, PhilHealth, Pag-IBIG contributions
- Generate BIR reports
- File contributions with government agencies
- Track payment status
- Maintain compliance records

**Timeline**: Monthly for most, quarterly for some

---

## System Requirements

### Access Requirements
- **Office Staff**: Company computer with web browser
- **HR Managers**: Same as office staff
- **Payroll Officer**: Same, plus access to payment systems
- **Superadmin**: Administrative access to server

### User Restrictions
- **Supervisors**: Paper forms to HR Staff (no system access)
- **Employees**: Paper forms to HR Staff (no system access)
- **External Parties**: No direct system access

### Data Privacy
- Role-based access control enforced
- All access logged and auditable
- Sensitive data encrypted at rest
- Government compliance for data retention

---

## Key Business Rules

### Leave Management
- Balance-based system (e.g., 10 days/year)
- VL/SL tracking separate from other leaves
- Requires HR Manager approval before recording

### Overtime Approval
- Must be approved before payroll processing
- Overtime rates defined by business rules
- Reconciliation against actual RFID timekeeping

### Payroll Cycles
- Monthly cycle (typically 1st of month)
- Locked period for data integrity
- All changes require audit trail

### Government Compliance
- Monthly SSS/PhilHealth/Pag-IBIG filings
- Quarterly BIR filings
- Annual tax reporting
- Document retention for 3+ years

---

## System Status & Monitoring

### Key Metrics
- **System Uptime**: Target 99.5% availability
- **Ledger Latency**: Should be <5 minutes for event recording
- **Payroll Processing Time**: 1-2 days for monthly cycle
- **Data Backup**: Daily automatic backups
- **Recovery Time**: <4 hours in case of failure

### Alerts & Notifications
- Ledger integrity issues
- Approval workflow delays
- System performance degradation
- Backup failures
- User login anomalies

---

## Next Steps

1. **Review your role** in the Workflows section (01-05)
2. **Explore business processes** relevant to your responsibilities
3. **Understand integration points** for your role
4. **Check ledger health** before critical operations
5. **Contact Superadmin** for access or emergency issues

---

**Last Updated**: November 29, 2025  
**Version**: 2.0  
**Maintained By**: Development Team
