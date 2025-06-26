# Shipment-Management-Form

📦 Shipment Management Form
A web-based form to manage and store shipment data using Login2Explore's JPDB API. This app allows users to input shipment details, save new records, update existing ones, and reset the form.

🔧 Features
📌 Add new shipment records

✏️ Edit existing records

🔍 Retrieve shipment by Shipment No.

🗑️ Reset form fields

☁️ Persistent data via JPDB backend

🌙 Clean dark UI for better usability



🧾 Fields Included
| Field Name             | Description                   |
| ---------------------- | ----------------------------- |
| Shipment No. (ID)      | Unique ID for the shipment    |
| Description            | Brief details of the shipment |
| Source                 | Origin location               |
| Destination            | Target location               |
| Shipping Date          | Date when shipment is sent    |
| Expected Delivery Date | Estimated date of delivery    |


📁 Project Structure
shipment-management/
│
├── index.html          # User Interface
├── index.js            # Form validation & API logic
└── README.md           # Project documentation


🚀 How It Works
Enter Shipment No.
Automatically checks if the shipment exists in JPDB.

If New:

Fill out the entire form

  Click Save

If Exists:

Fields are auto-filled

  Make changes and click Change

Reset:
  Clears all input fields.


  🔗 API Details
API Base URL: http://api.login2explore.com:5577

Database Name: DELIVERY-DB

Relation Name: SHIPMENT-TABLE

Auth Token: (Private token used in JS code)

Note: Uses createPUTRequest, createUPDATERecordRequest, createGET_BY_KEYRequest and executeCommandAtGivenBaseUrl() from the JPDB Commons library.

📦 Dependencies
jQuery
Bootstrap 4
JPDB Commons

🧠 Author & License
Developed by: Varun Pareek

License: MIT – Feel free to use, modify, and distribute.
