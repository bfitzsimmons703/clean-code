export abstract class Sql {
	abstract generate(): string;
}

class SelectSql extends Sql {
	generate(): string {
		return 'select id from ...';
	}
}
class SelectAllSql extends Sql {
	generate(): string {
		return 'select * from ...';
	}
}
class InsertSql extends Sql {
	generate(): string {
		return 'insert into ...';
	}
}
class CreateSql extends Sql {
	generate(): string {
		return 'create table ...';
	}
}
