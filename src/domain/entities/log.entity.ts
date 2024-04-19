

export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( {level, message, createdAt = new Date(), origin}: LogEntityOptions ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
        this.origin = origin
    }

     //"{ "level": "high", "message":"Hola Mundo", "createdAt":"128937TZ12378123" }"
  static fromJson = ( json: string ): LogEntity => {
    
    json = json === '' ? '{}' : json
    const { message, level, createdAt, origin } = JSON.parse(json);
  
    const log = new LogEntity({
      message, 
      level,
      createdAt, 
      origin
    });
    
    log.createdAt = new Date(createdAt);
    
    return log;
  }

  static fromObject = ( object: { [key: string]: any } ): LogEntity => {
    const { message, level, createdAt, origin } = object;

    const log = new LogEntity({
      message, level, createdAt, origin
    })
    
    return log;
  }
}