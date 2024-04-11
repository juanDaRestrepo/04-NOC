import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
) 

export class Server {
    static start() {
        console.log('Server started...');
        
        CronService.createJob(
            '*/5 * * * * *', 
            () => {
                const url = 'https://localhost:3000';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log( `${ url } is ok` ),
                    ( error ) => console.log( error ) 
                ).execute( url )
            }
        )
    }
}