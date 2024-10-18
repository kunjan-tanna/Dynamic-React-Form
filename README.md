# Dynamic React Form

Creating a dynamic form using React.js that can generate fields based on a given JSON structure. The form should be adaptive, meaning any changes in the JSON structure should automatically reflect in the form, even if there is saved data.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Design Choices](#design-choices)
- [Store Data](#store-data)

## Installation

To set up and run this project locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   cd Dynamic-React-Form

   ```

2. **Install dependencies:**:

   ```bash
   npm install
   ```

3. **Run the development server:**:

   ```bash
   npm run start
   ```

## Project Structure

```bash
 src/
 ├── components/
 │   │   ├── FormField.jsx
 │   │   ├── FormGroup.jsx
 │   │   └── SideBar.jsx
 └── App.css
 └── App.jsx
 └── form.json
 └── index.css
```

## Design Choices

**Material UI**  
 To ensure a responsive and modern UI, Material UI is used across the project. It provides a consistent look and feel for components like buttons, modals, tables, and forms.

## Store Data

**LocalStorage** <br/>
To store the data in particular groups.
