/**
 ** For Non-Capturing Regular Expression Groups -> Use the following Expression -> (?:<RegExp>)
 ** https://stackoverflow.com/questions/3512471/what-is-a-non-capturing-group-in-regular-expressions
 **/

/** @type {string} */
const validDecimalNumber = new RegExp(/(?:[1-9][0-9]*)/).toString().replace(/\//g, "");

/** @type {string} */
const validDoubleNumber = new RegExp(`(?:${validDecimalNumber}|(?:${validDecimalNumber}?[0-9][.][0-9]*[1-9]))`).toString().replace(/\//g, "");

/** @type {string} */
const validPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/).toString().replace(/\//g, "");

/** @type {string} */
const validUsername = new RegExp(/^(?=.*[a-zA-Z])[a-zA-Z\d]{5,15}$/).toString().replace(/\//g, "");

/** @type {string} */
const validBankAccountNumber = new RegExp(/^[a-zA-Z\d]{5,25}$/).toString().replace(/\//g, "");

/** @type {string} */
const validBankAccountName = new RegExp(/^[a-zA-Z ]{5,40}$/).toString().replace(/\//g, "");

/** @type {string} */
const validTransferNote = new RegExp(/^[a-zA-Z\d ]{1,210}$/).toString().replace(/\//g, "");



const RegExpUtils = {
    /** @type {function(flags=: string): InstanceType<RegExp>} */
    validDecimalNumber: (flags = "g") => {
        return new RegExp(`^[-]?${validDecimalNumber}$`, flags || 'g');
    },
    /** @type {function(flags=: string): InstanceType<RegExp>} */
    validDoubleNumber: (flags = "g") => {
        return new RegExp(`^[-]?${validDoubleNumber}$`, flags || 'g');
    },
    /** @type {function(flags=: string): InstanceType<RegExp>} */
    validPositiveDecimalNumber: (flags = "g") => {
        return new RegExp(`^${validDecimalNumber}$`, flags || 'g');
    },
    /** @type {function(flags=: string): InstanceType<RegExp>} */
    validPositiveDoubleNumber: (flags = "g") => {
        return new RegExp(`^${validDoubleNumber}$`, flags || 'g');
    },
    /** @type {function(flags=: string): InstanceType<RegExp>} */
    validPassword: function (flags = "g") {
        return new RegExp(`^${validPassword}$`, flags || 'g');
    },
    /** @type {function(flags=: string): InstanceType<RegExp>} */
    validUsername: function (flags = "g") {
        return new RegExp(`^${validUsername}$`, flags || 'g');
    },
    validBankAccountNumber: function (flags = "g") {
        return new RegExp(`^${validBankAccountNumber}$`, flags || 'g');
    },
    validBankAccountName: function (flags = "g") {
        return new RegExp(`^${validBankAccountName}$`, flags || 'g');
    },
    validTransferNote: function (flags = "g") {
        return new RegExp(`^${validTransferNote}$`, flags || 'g');
    }
};

export default RegExpUtils;
