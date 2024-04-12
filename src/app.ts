
import { Console } from "console";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.pulgin";



(async() => {
    main();
})();


function main() {
    Server.start();
    /* console.log(envs.PORT) */
}