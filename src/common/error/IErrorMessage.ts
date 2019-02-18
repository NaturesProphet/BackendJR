import { AppErrorTypeEnum } from './AppErrorTypeEnum';
import { HttpStatus } from '@nestjs/common';


export interface IErrorMessage {
    type: AppErrorTypeEnum;
    status: HttpStatus;
    errorMessage: string;
    userMessage: string;
    timestamp: string;
}

