(async () => {
    // get emplayee data 
    const data = await fetch('./employee.json')
    const res = await data.json()
    console.log(res);
    let activeEmployeeData = res[0]
    let activeEmployeeid = res[0].id

    let employeeListContainer = document.querySelector('#employee-list');
    employeeListContainer.addEventListener('click', (e) => {
        if (activeEmployeeid !== e.target.id) {
            activeEmployeeid = e.target.id;
            getEmployeeList();
            showEmployeeDetails();
        }
    })

    // prepare a list of employees
    function getEmployeeList() {
        employeeListContainer.innerHTML = ''
        for (let i = 0; i < res.length; i++) {
            let element = document.createElement('div')
            // element.addEventListener('click' , selectEmployees)
            element.classList.add('employee-list-item')
            if (activeEmployeeid == res[i].id) {
                element.classList.add('.selected')
                activeEmployeeData = res[i]
            }
            element.setAttribute("id", res[i].id);
            element.innerHTML = `${res[i].firstName} ${res[i].lastName}`
            employeeListContainer.append(element)
        }

        showEmployeeDetails()
    }

    function selectEmployees(i) {
        console.log(i)
    }

    function showEmployeeDetails() {
        const employeeDetailsContainer = document.querySelector('#employee-details');
        employeeDetailsContainer.innerHTML = `
        <img src="${activeEmployeeData.imageUrl}" width="100px">
        <p> Name: ${activeEmployeeData.firstName} ${activeEmployeeData.lastName}</p>
        <p> Email: ${activeEmployeeData.email}</p>
        <p> Contact Number: ${activeEmployeeData.contactNumber}</p>
        <p> Address: ${activeEmployeeData.address}</p>
       `
    }

    getEmployeeList();
})()