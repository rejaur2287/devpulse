# 🚼 DevPulse – Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

## 📋 Project Overview

DevPulse is a Backend web application designed to help development teams efficiently manage and track technical issues and feature requests. It provides a centralized hub where contributors can report problems and suggest improvements, while maintainers can oversee, update, and resolve them.

## ✨ Key Features

- **User Authentication**: Secure JWT-based authentication system
- **User Roles**: Two distinct roles - Contributor and Maintainer
- **Issue Management**: Create, read, update, and delete technical issues
- **Issue Types**: Support for bug reports and feature requests
- **Issue Status Tracking**: Track issue workflow (open → in_progress → resolved)
- **Advanced Filtering**: Filter issues by type, status, and more
- **Sorting**: Sort issues by newest or oldest
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js (LTS 24.x or higher)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (native `pg` driver)
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcrypt (salt rounds 8-12)
- **Architecture**: Modular router architecture with separation of concerns

### Deployment

- **Backend**: Vercel,
- **Database**: NeonDB

## 👥 User Roles & Permissions

### Contributor

- Register and log in
- Create new issues (bug or feature request)
- View all issues
- Update own issues (only if status is `open`)
- View issue details

### Maintainer

- All contributor permissions
- Update any issue field
- Delete any issue
- Change issue workflow status independently
- Access internal system metrics
