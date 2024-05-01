import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe( 'send-email-logs', () => {

    const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };

    const mockEmailService = {
        sentEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
      };

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockRepository,
        
      );

      beforeEach(() => {
        jest.clearAllMocks();
      })

    test( 'Should call sendEmail and saveLog', async () => {
        const result = await sendEmailLogs.execute( 'juanrestrepowebdev@gmail.com' );
        
        expect( result ).toBe(true);
        expect( mockEmailService.sentEmailWithFileSystemLogs ).toBeCalledTimes(1);
        expect( mockRepository.saveLog ).toBeCalledWith( expect.any(LogEntity));
        expect( mockRepository.saveLog ).toBeCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-email-logs.ts",
        })
    });

    test( 'Should log in case of error', async () => {

        mockEmailService.sentEmailWithFileSystemLogs.mockResolvedValue( false );

        const result = await sendEmailLogs.execute( 'juanrestrepowebdev@gmail.com' );
        
        expect( result ).toBe(false);
        expect( mockEmailService.sentEmailWithFileSystemLogs ).toBeCalledTimes(1);
        expect( mockRepository.saveLog ).toBeCalledWith( expect.any(LogEntity));
        expect( mockRepository.saveLog ).toBeCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts",
        })
    })
})  