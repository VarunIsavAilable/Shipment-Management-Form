var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var dbName = "DELIVERY-DB";
var relName = "SHIPMENT-TABLE";
var connToken = "Private token used in JS code"; //Use your token here...

$("#shipno").focus();

function saveRecNo2LS(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", data.rec_no);
}

function getShipmentIdAsJsonObj() {
    var shipno = $('#shipno').val();
    return JSON.stringify({ id: shipno });
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;

    $('#description').val(data.description);
    $('#source').val(data.source);
    $('#destination').val(data.destination);
    $('#shipdate').val(data.shipdate);
    $('#deliverydate').val(data.deliverydate);
}

function resetForm() {
    $('#shipno').val('');
    $('#description').val('');
    $('#source').val('');
    $('#destination').val('');
    $('#shipdate').val('');
    $('#deliverydate').val('');

    $('#shipno').prop('disabled', false);
    $('#save').prop('disabled', true);
    $('#change').prop('disabled', true);
    $('#reset').prop('disabled', true);

    $('#shipno').focus();
}

function validateData() {
    var shipno = $('#shipno').val();
    var desc = $('#description').val();
    var source = $('#source').val();
    var dest = $('#destination').val();
    var shipdate = $('#shipdate').val();
    var deliverydate = $('#deliverydate').val();

    if (shipno === '') {
        alert("Shipment No. missing");
        $('#shipno').focus();
        return "";
    }
    if (desc === '') {
        alert("Description missing");
        $('#description').focus();
        return "";
    }
    if (source === '') {
        alert("Source missing");
        $('#source').focus();
        return "";
    }
    if (dest === '') {
        alert("Destination missing");
        $('#destination').focus();
        return "";
    }
    if (shipdate === '') {
        alert("Shipping date missing");
        $('#shipdate').focus();
        return "";
    }
    if (deliverydate === '') {
        alert("Expected delivery date missing");
        $('#deliverydate').focus();
        return "";
    }

    return JSON.stringify({
        id: shipno,
        description: desc,
        source: source,
        destination: dest,
        shipdate: shipdate,
        deliverydate: deliverydate
    });
}

function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") return;

    var putRequest = createPUTRequest(connToken, jsonStr, dbName, relName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });

    resetForm();
    $('#shipno').focus();
}

function changeData() {
    $('#change').prop('disabled', true);
    var jsonChg = validateData();
    if (jsonChg === "") return;

    var updateRequest = createUPDATERecordRequest(
        connToken, jsonChg, dbName, relName, localStorage.getItem("recno")
    );
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });

    console.log(resJsonObj);
    resetForm();
    $('#shipno').focus();
}

function getShipment() {
    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, getShipmentIdAsJsonObj());
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#description').focus();
    } else if (resJsonObj.status === 200) {
        $('#shipno').prop('disabled', true);
        fillData(resJsonObj);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#description').focus();
    }
}
