const DRIVER_LIST = [
    {
        firstName: "John",
        lastName: "Doe",
        now: "Delivery",
        next: "Rest",
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
        now: "Delivery",
        next: "Rest",
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

const ORDER_LIST = [
    {
        id: "Order#0001",
        clientId: "Client-0001",
        clientName: "L'Oréal",
        pickupDate: "2022-05-01",
        weight: 0,
        volume: 0,
        address: {
            stNumber: "999",
            stName: "Fake St",
            zipCode: "XXX XXX",
            city: "Montreal", 
            province: "QC",
            country: "CAN"
        }
    },
    {
        id: "Order#0002",
        clientId: "Client-0001",
        clientName: "L'Oréal",
        pickupDate: "2022-05-01",
        weight: 0,
        volume: 0,
        address: {
            stNumber: "999",
            stName: "Fake St",
            zipCode: "XXX XXX",
            city: "Montreal", 
            province: "QC",
            country: "CAN"
        }
    },
    {
        id: "Order#0003",
        clientId: "Client-0002",
        clientName: "Coca-Cola",
        pickupDate: "2022-05-01",
        weight: 0,
        volume: 0,
        address: {
            stNumber: "999",
            stName: "Fake St",
            zipCode: "XXX XXX",
            city: "Montreal", 
            province: "QC",
            country: "CAN"
        }
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
    Handlebars.registerHelper("count", count);
    Handlebars.registerHelper("isBasedInCanada", isBasedInCanada);
    Handlebars.registerHelper("isBasedInUSA", isBasedInUSA);
}

/**
 * 
 * @param {*} arr 
 */
function count(arr) {
    return arr.length;
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
    document.getElementById("colA").innerHTML = "";
    const template = Handlebars.compile(document.getElementById("driverList").innerHTML);
    
    if (driverList) {
        document.getElementById("colA").innerHTML = template({driverList});
    }
    else {
        document.getElementById("colA").innerHTML = template({driverList: DRIVER_LIST});
    }
}

/**
 * 
 */
 function loadGlobalKPIs() {
    kpis = {
        emptyMiles: 0,
        totalMiles: 0,
        numberOfPickups: 0,
        income: 0
    }

    DRIVER_LIST.forEach(d => {
        kpis["emptyMiles"] += d.kpis.emptyMiles
        kpis["totalMiles"] += d.kpis.totalMiles
        kpis["numberOfPickups"] += d.kpis.pickUpsAssigned
        kpis["income"] += d.kpis.income
    })

    const template = Handlebars.compile(document.getElementById("globalKPIs_tpl").innerHTML)
    document.getElementById("globalKPIs").innerHTML = template({ kpis });
}

/**
 * 
 */
function loadOrderList() {
    const clients = {};

    ORDER_LIST.forEach(o => {
        const client = clients[o.clientId] || { clientId: o.clientId, clientName: o.clientName, orderList: [] };
        client.orderList.push(o);
        clients[o.clientId] = client;
    })

    const template = Handlebars.compile(document.getElementById("orderList-tpl").innerHTML)
    document.getElementById("colB").innerHTML = template({ clients });
}

(function() {
    initScreenSplitter();  
    initHandlebars();
    loadDriverList();
    loadGlobalKPIs();
    loadOrderList();
    setEventBindings();  
})()