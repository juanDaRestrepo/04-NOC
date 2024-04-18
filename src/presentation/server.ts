import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { envs } from "../config/plugins/envs.pulgin";
import { EmailService } from "./email/email-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
) 
const emailService = new EmailService();

export class Server {
    static start() {
        console.log('Server started...');
        
        /* new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(['juanrestrepowebde@gmail.com', 'jdrestrepo@unitecnica.net']) */

        // Send email
        /* const emailService = new EmailService(fileSystemLogRepository); */

        /* emailService.sendEmail({
            to: 'juanrestrepowebdev@gmail.com',
            subject: 'practice',
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Esse est irure magna ipsum enim excepteur velit qui occaecat non sit labore. Excepteur ut ut ex in culpa culpa sint aliquip commodo. Cillum ipsum pariatur sunt ut commodo fugiat. Tempor esse est cupidatat est sit. Fugiat ea officia ipsum duis aute non amet magna in elit. Lorem ex dolor quis do. Culpa veniam ipsum aliquip qui tempor commodo.</p>
                <p>Ver logs adjuntos</p>
            `
        }); */

        /* emailService.sentEmailWithFileSystemLogs(
            ['juanrestrepowebde@gmail.com', 'jdrestrepo@unitecnica.net']
        ) */
    
        //CronService.createJob(
        //    '*/5 * * * * *', 
        //    () => {
        //        const url = 'https://localhost:3000';
        //        new CheckService(
        //            fileSystemLogRepository,
        //            () => console.log( `${ url } is ok` ),
        //           ( error ) => console.log( error ) 
        //        ).execute( url )
        //    }
        //)
    }
}