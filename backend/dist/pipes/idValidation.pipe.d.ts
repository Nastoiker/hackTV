import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
export declare class IdValidationpipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): string;
}
