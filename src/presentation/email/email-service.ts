import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.pulgin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments? : Attachment[]
}
interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    constructor(
        private readonly logRepository: LogRepository
    ){}

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        
        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            /* console.log(sentInformation); */
            const log = new LogEntity({
                level : LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            })
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const log = new LogEntity({
                level : LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            })
            this.logRepository.saveLog(log);
            console.log('error:' + error)
            return false;
        }
    }

    async sentEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        
        const htmlBody =`
            <h3>Logs de sistema - NOC</h3>
            <p>Esse est irure magna ipsum enim excepteur velit qui occaecat non sit labore. Excepteur ut ut ex in culpa culpa sint aliquip commodo. Cillum ipsum pariatur sunt ut commodo fugiat. Tempor esse est cupidatat est sit. Fugiat ea officia ipsum duis aute non amet magna in elit. Lorem ex dolor quis do. Culpa veniam ipsum aliquip qui tempor commodo.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments:Attachment[] = [
            { filename: 'logs-low.log', path: './logs/logs-low.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'}
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        })
    }


}
