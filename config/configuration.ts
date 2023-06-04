// a custom configuration loader to be used with the ConfigModule

export function loadJsonConfig(){
    // load the json file located at the /config/config.dev.json path
    // and return its content as an object
    return require('./config.dev.json');
}