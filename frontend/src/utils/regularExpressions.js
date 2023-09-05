const regExInputName = "^[0-9a-zA-ZА-Яа-яЁё\\- ]+[0-9a-zA-ZА-Яа-яЁё\\-]{1,30}$";
const regExInputEmail = "[a-zA-Z0-9][a-z0-9]+\\.{1,1}[a-z]{2,3}$";
const regExInputSearch = /^[^\s]+(\s+[^\s]+)*$/

export { regExInputName, regExInputEmail, regExInputSearch }
