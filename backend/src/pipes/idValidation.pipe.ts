import { BadRequestException, Injectable } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { ID_VALIDATION_ERROR } from './ad-Validation.constants';
@Injectable()
export class IdValidationpipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type != 'param') {
			return value;
		}
		return value;
	}
}
