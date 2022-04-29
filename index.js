const DRIVER_LIST = [
    {
        firstName: "John",
        lastName: "Doe",
        kpis: {
            pickUpsAssigned: 8,
            deliveriesToDo: 10,
            totalMiles: 8000,
            emptyMiles: 100,
            income: 4500.80
        },
        truck: {
            id: "Truck#1234"
        },
        trailer: {
            id: "Trailer#1234"
        },
        trips: [
            {
                id: "trip#00001",
                eta: "2022-05-01 12:00:00",
                client: "L'Oréal",
                address: {
                    city: "Boucherville",
                    province: "QC",
                    country: "CAN"
                }
            },
            {
                id: "trip#00008",
                eta: "2022-05-01 12:00:00",
                client: "L'Oréal",
                address: {
                    city: "Boucherville",
                    province: "QC",
                    country: "CAN"
                }
            },
            {
                id: "trip#00010",
                eta: "2022-05-01 12:00:00",
                client: "L'Oréal",
                address: {
                    city: "Boucherville",
                    province: "QC",
                    country: "USA"
                }
            }
        ]
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        kpis: {
            pickUpsAssigned: 8,
            deliveriesToDo: 10,
            totalMiles: 8000,
            emptyMiles: 100,
            income: 4500.80
        },
        truck: {
            id: "Truck#1234"
        },
        trailer: {
            id: "Trailer#1234"
        },
        trips: [
            {
                id: "trip#00012",
                eta: "2022-05-01 12:00:00",
                client: "L'Oréal",
                address: {
                    city: "Boucherville",
                    province: "QC",
                    country: "CAN"
                }
            },
            {
                id: "trip#00015",
                eta: "2022-05-01 12:00:00",
                client: "L'Oréal",
                address: {
                    city: "Boucherville",
                    province: "QC",
                    country: "CAN"
                }
            },
            {
                id: "trip#00018",
                eta: "2022-05-01 12:00:00",
                client: "L'Oréal",
                address: {
                    city: "Boucherville",
                    province: "QC",
                    country: "USA"
                }
            }
        ]
    }
];

/**
 * 
 */
function initScreenSplitter() {
    Split(['#colA', '#colB'])
}

/**
 * 
 */
function initHandlebars() {
    Handlebars.registerHelper("isBasedInCanada", isBasedInCanada);
    Handlebars.registerHelper("isBasedInUSA", isBasedInUSA);
}

/**
 * 
 */
function isBasedInCanada(country) {
    return "CAN" === country;
}

/**
 * 
 */
 function isBasedInUSA(country) {
    return "USA" === country;
}

/**
 * 
 */
function setEventBindings() {
    document.getElementById("search_btn")
            .addEventListener("click", searchDriver)
    
    document.getElementById("search_reset")
            .addEventListener("click", resetDriverSearch)
}

/**
 * 
 * @param {*} event 
 */
function searchDriver(event) {
    const value = document.getElementById("search_input").value;

    if (!value) return;
    
    const driverList = DRIVER_LIST.filter(d => {
        const fullName = d.firstName + " " + d.lastName;
        return fullName.toLowerCase().includes(value.toLowerCase());
    });

    loadDriverList(driverList);
}

/**
 * 
 * @param {*} event 
 */
function resetDriverSearch(event) {
    loadDriverList();
}

/**
 * 
 */
function loadDriverList(driverList) {
    console.log(driverList)
    document.getElementById("colA").innerHTML = "";
    const template = Handlebars.compile(document.getElementById("driverList").innerHTML);
    
    if (driverList) {
        document.getElementById("colA").innerHTML = template({driverList});
    }
    else {
        document.getElementById("colA").innerHTML = template({driverList: DRIVER_LIST});
    }
}

(function() {
    initScreenSplitter();  
    initHandlebars();
    loadDriverList();
    setEventBindings();  
})()