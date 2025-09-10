# **MIGRATIONS**
![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) 

## **Description**
This proyect is made with Pyhton and Django to make migrations. This proyect consists of basic book loan management system, where authors, editorial, books, and loans made by users.

### **First model - Migration 1 (Author)**

![First Model](./docs/first_model.png)

_The first Author model was created, which represents authors with their basic personal data such as first name, last name, date of birth, and nationality_

### **Second model - Migration 2 (Editorial)**

![Second Model](./docs/second_model.png)

_The Second Editorial model was added, linked to Author (First Model) by a foreign key in the founder field. This allows to record which autor founded each Editorial_

### **Third model - Migration 3 (Book)**

![Third Model](./docs/third_model.png)

_The third Book model was added, linked to Author (First Model) by a foreign key in the author field. In this way, books written by an author can be registered_

### **Fourt model - Migration 4 (Loan)**

![Fourth Model](./docs/fourth_model.png)

_Finally, the fourth model was created, which is related to Book and Author through foreign keys. This model represents book loans, indicating the user, loan and return dates, as well as the loan status_
