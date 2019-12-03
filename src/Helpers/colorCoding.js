const ROOM1 = 'orange';
const ROOM2 = 'red';

const TALK = 'blue';
const SEMINAR = 'purple';

export function colorCode(code) {
	code = code.toLowerCase();
	switch (code) {
		case 'room 1':
			return ROOM1;
		case 'room 2':
			return ROOM2;
		case 'talk':
			return TALK;
		case 'seminar':
			return SEMINAR;
		default:
			return 'yellow'
	}
}