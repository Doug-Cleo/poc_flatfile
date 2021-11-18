

// connect the button on the initial screen to launch flatfile
document.getElementById('import').addEventListener('click', async () => {
    launchFlatfile();
});

/**
 * HTTP POST the results to the server
 */
function postData(results) {
    const validResults = results.validData;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/process_json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify(validResults));
}

/**
 * This function is called by the button click to launch flat file
 * and begin the importing, validation process
 */
function launchFlatfile() {
    importer.requestDataFromUser()
        .then(function (results) {
            postData(results);
            importer.displaySuccess('Thanks for trying this out');
        })
        .catch(error => {
            console.info(error || 'window close');
        })
}

/**
 * Create an instance of the flat file importer passing it
 * information about the CSV file to import and validate.
 */
const importer = new FlatfileImporter(
    '5fdae7f9-84ca-43bd-b178-2c401871be38',
    {
        type: 'eligibility ingestion',
        managed: false,
        devMode: true,
        fields: [
            { 
                key: 'company_id', 
                label: 'Company ID',
                description: 'The Company ID value',
                validators: [
                    { validate: 'required' },
                ],
            },
            { 
                key: 'employee_id', 
                label: 'Employee ID',
                description: 'The Employee ID value',
                validators: [
                    { validate: 'required' },
                    { validate: 'unique' },
                ],
            },
            { 
                key: 'first_name', 
                label: 'First Name',
                description: 'The Employee First Name',
                alternates: ['FName'],
                validators: [
                    { validate: 'required' },
                ],
            },
            { 
                key: 'last_name', 
                label: 'Last Name',
                description: 'The Employee Last Name',
                alternates: ['LName'],
                validators: [
                    { validate: 'required' },
                ],
            },
            { 
                key: 'employee_email', 
                label: 'Employee Email',
                description: 'The Employee Company Email',
                alternates: ['Work Email'],
                validators: [
                    { validate: 'required' },
                    { validate: 'unique' },
                    { 
                        validate: 'regex_matches',
                        regex: "(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
                        error: 'Doesn\'t match RFC 5322 email standard',
                    }
                ],
            }
        ],
    }
);

// register field hook to ensure all the employee email has a valid
// domain
const valid_domain = 'test.com';
importer.registerFieldHook('employee_email', values => {
    const retval = [];
    for (let index=0, length=values.length; index < length; index++) {
        const email = values[index][0]
        if (/.*?test.com?/.test(email) === false) {
            retval.push([
                {
                    value: email,
                    info: [
                        {
                            message: 'Invalid email domain',
                            level: 'error',
                        }
                    ],
                },
                index
            ]);
        }
    }
    return retval;
});


importer.setCustomer({ userId: '12345' });

