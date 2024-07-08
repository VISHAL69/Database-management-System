(async () => {
    // get emplayee data 
    const data = await fetch('./employee.json')
    let res = await data.json()
    console.log(res);
    let activeEmployeeData = res[0]
    let activeEmployeeid = res[0].id

    let employeeListContainer = document.querySelector('#employee-list');
    employeeListContainer.addEventListener('click', (e) => {
        console.log(e);
        if (e.target.nodeName === 'DIV' && activeEmployeeid !== e.target.id) {
            activeEmployeeid = e.target.id;
            getEmployeeList();
            showEmployeeDetails();
        }

        if (e.target.nodeName === 'I') {
            res = res.filter(emp => {
                console.log(e.target.parentNode.id != emp.id);
                return e.target.parentNode.id != emp.id
            })

            if (activeEmployeeid == e.target.parentNode.id) {
                activeEmployeeid = res[0]?.id || -1
                activeEmployeeData = res[0] || {}
                showEmployeeDetails();

            }

            getEmployeeList();
        }
    })

    let addEmployeeBtn = document.querySelector('#add-btn');
    addEmployeeBtn.addEventListener('click', (e) => {
        
        showHideEmployeeForm();
    })

    let addEmployeeForm = document.querySelector('.add-employee-form-modal');
    addEmployeeForm.addEventListener('click', (e) => {
        console.log(e);
        if (e.target.classList.contains('add-employee-form-modal'))
            showHideEmployeeForm();
    })

    function showHideEmployeeForm() {
        let addEmployeeContainer = document.querySelector('.add-employee-form-modal');
        if (addEmployeeContainer.classList.contains('showForm')) {
            addEmployeeContainer.classList.remove("showForm")
        } else {
            addEmployeeContainer.classList.add("showForm")
        }
    }

    let employeeForm = document.querySelector('.form-container');
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault()
        newEmployeeData = {}
        formData = new FormData(employeeForm)
        formEntries = [...formData.entries()];
        formEntries.forEach(el => {
            newEmployeeData[el[0]] = el[1]
        });
        console.log(newEmployeeData);
        newEmployeeData['id'] = res[res.length - 1].id + 1
        res.push(newEmployeeData)
        employeeForm.reset()
        getEmployeeList()
        showHideEmployeeForm()
    })


    // prepare a list of employees
    function getEmployeeList() {
        employeeListContainer.innerHTML = ''
        for (let i = 0; i < res.length; i++) {
            let element = document.createElement('div')
            element.classList.add('employee-list-item')
            if (activeEmployeeid == res[i].id) {
                element.classList.add('active')
                activeEmployeeData = res[i]
            }
            element.setAttribute("id", res[i].id);
            element.innerHTML = `<span> ${res[i].firstName} ${res[i].lastName} </span> <i class="bi bi-trash3 icon-color"></i>`
            employeeListContainer.append(element)
        }
        showEmployeeDetails()
    }

    function showEmployeeDetails() {
        console.log(activeEmployeeData);
        const employeeDetailsContainer = document.querySelector('#employee-details');
        if(Object.keys(activeEmployeeData).length){
            employeeDetailsContainer.innerHTML = `
            <img src="${activeEmployeeData.imageUrl ? activeEmployeeData.imageUrl : 'https://cdn-icons-png.flaticon.com/512/0/93.png'}" width="150px" class="img-style">
            <p> Name: ${activeEmployeeData.firstName} ${activeEmployeeData.lastName}</p>
            <p> Email: ${activeEmployeeData.email}</p>
            <p> Contact Number: ${activeEmployeeData.contactNumber}</p>
            <p> Address: ${activeEmployeeData.address}</p>
           `
        }
        else{
             employeeDetailsContainer.innerHTML = `No records to show`
        }
    }

    getEmployeeList();
})()