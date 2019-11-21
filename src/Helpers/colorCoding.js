const ROOM1 = 'orange';
const ROOM2 = 'red';

const TALK = 'blue';
const SEMINAR = 'purple';

export function colorCode(code) {
	code = code.toLowerCase();
	switch (code) {
		case 'room 1':
			return ROOM1;
			break;
		case 'room 2':
			return ROOM2;
			break;
		case 'talk':
			return TALK;
			break;
		case 'seminar':
			return SEMINAR;
			break;
		default:
			return 'primaryColor'
			break;
	}
}