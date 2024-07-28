import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main(){
    const argv = process.argv
    console.log("Arguments received:", argv);
    if (argv.length < 3) { 
        console.log(" no website provided");
        return
    }
    if (argv.length > 3){
        console.log("too may arguments provided")
        return
    }

    const baseURL = argv[2];
    console.log(`starting crawl of: ${baseURL}...`)

  const pages = await crawlPage(baseURL)

  printReport(pages)
}

main();