const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error('Creating a repo requires a filename');
		}
		this.filename = filename;
		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, '[]');
		}
	}
	async getAll() {
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
	}
	async create(attrs) {
		attrs.id = this.generateId();
		const records = await this.getAll();
		records.push(attrs);
		await this.writeAll(records);
	}
	async writeAll(records) {
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
	}
	generateId() {
		return crypto.randomBytes(4).toString('hex');
	}
	async getOne(id) {
		const records = await this.getAll();
		return records.find((record) => record.id === id);
	}
	async delete(id) {
		const records = await this.getAll();
		const filteredRecords = records.filter((record) => record.id !== id);
		await this.writeAll(filteredRecords);
	}
	async update(id, attrs) {
		let records = await this.getAll();
		let record = records.find((record) => record.id === id);
		if (!record) {
			throw new Error(`Records with ${id} id was not found.`);
		}
		let updatedRecords = records.map((record) => (record.id === id ? { ...record, ...attrs } : record));
		await this.writeAll(updatedRecords);
	}
	async getOneBy(filters) {
		const records = await this.getAll();
		for (let record of records) {
			let found = true;
			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) {
				return record;
			}
		}
	}
}

module.exports = new UsersRepository('users.json');
