# Pijin App  
**Your Local Chat, Wherever You Go!**

[![App Store](https://img.shields.io/badge/Download-iOS%20App-blue?logo=apple)](https://apps.apple.com/us/app/pijin-app/id6700167370)  
[![Coming Soon on Android](https://img.shields.io/badge/Google%20Play-Coming%20Soon-orange)](#)

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)
- [Contact](#contact)
- [Supabase Local Development](#supabase-local-development)

---

## Introduction

Pijin App is a local chat platform that connects you with people in your area instantly. Whether you're chatting with neighbors on your street, staying updated on neighborhood events, or meeting new friends across the city, Pijin makes local communication fast, fun, and effortless.

*Connect. Chat. Discover your community.*

---

## Features

- **Local Chats:** Engage in street-level conversations and exchange recommendations right on your block.
- **Neighborhood & City-Wide Groups:** Stay in the loop with local events and discover hidden spots as you move about.
- **Auto-Syncing:** As you travel, Pijin updates your channels automatically, ensuring you're always connected with nearby communities.
- **Fun & Fast Communication:** Send "Pijins" – short, preset question prompts with emoji, GIF, or image responses.
- **Secure & Ad-Free:** Enjoy a privacy-focused chat experience with no intrusive ads.

---

## Screenshots

![Pijin Home Screen](/public/preview/dashboard.png)  
---

## Installation & Setup

**iOS Users:**  
Download Pijin App for free on the [App Store](https://apps.apple.com/us/app/pijin-app/notyetpublished).

**Android Users:**  
*Coming Soon!* Stay tuned for the Android release.

If you're interested in contributing to the project or setting it up locally for development, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file for instructions.

---

## Usage

1. **Sign Up or Log In:**  
   Create an account with your valid US phone number.

2. **Create or Join a Chat:**  
   - Start a new "Coop" (group chat) by inviting friends.
   - Join channels for your street, neighborhood, or across the city.
   
3. **Send a Pijin:**  
   Send quick, preset questions to spark conversation. Your friends can reply using emojis, GIFs, or images.

4. **Stay Connected:**  
   As you move about, Pijin automatically syncs with new local channels so you never miss a conversation.

---

## Roadmap

- **New Feature:** Multi-language support for even broader local connections.
- **UI Enhancements:** More customization options for chat themes.
- **Platform Expansion:** Android version and web client coming soon.
- **Additional Integrations:** Improved media sharing and event discovery tools.

---

## Contributing

Contributions are welcome! If you'd like to help improve Pijin App, please check out our contribution guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).  
When submitting issues or pull requests, kindly adhere to our code of conduct.

---

## Support

If you have any questions, encounter issues, or would like to share feedback, please visit our [Support Page](https://www.pijin.app/?page=support).

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Contact

**Pijin App**  
Website: [www.pijin.app](https://www.pijin.app/)  
Email: [support@pijin.app](mailto:support@pijin.app)  

© 2024 Pijin. All rights reserved.

---

*Thank you for choosing Pijin App – where local connections come alive!*

## Supabase Local Development

### Prerequisites
- Docker and Docker Compose
- Supabase CLI (`npm install -g supabase`)
- Node.js 18+

### Local Setup

1. Start the local Supabase stack:
```bash
docker-compose up -d
```

2. Initialize the database:
```bash
supabase db reset
```

3. Set up your environment variables:
```bash
cp .env.development .env.local
```

4. Start the development server:
```bash
npm run dev
```

The local Supabase stack will be available at:
- Studio: http://localhost:54323
- API: http://localhost:54321
- Database: postgresql://postgres:postgres@localhost:54322/postgres

### Database Migrations

Create a new migration:
```bash
supabase migration new <migration-name>
```

Apply migrations:
```bash
supabase db push
```

### CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The following secrets need to be set in your GitHub repository:

- `SUPABASE_ACCESS_TOKEN`: Your Supabase access token
- `SUPABASE_DB_PASSWORD`: Database password for your Supabase project
- `PROD_PROJECT_ID`: Production project reference ID
- `STAGING_PROJECT_ID`: Staging project reference ID

The pipeline will:
1. Run tests on pull requests
2. Apply migrations on merge to staging/main
3. Deploy edge functions on merge to staging/main

### Environment Management

- Development: Local Supabase instance
- Staging: Staging project on Supabase Platform
- Production: Production project on Supabase Platform
