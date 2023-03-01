class NoteRepo {
    constructor(con) {
        this.con = con;
    }
    async getNotes() {
        try {
            const result = await this.con.query(`select id,title,note from notetext where forkey=${id} `)
            return result;
        } catch(e) {
            console.log("Error : ",e)
        }
    }
    getNoteByNoteId(note_id) {

    }
    updateNote(note_id,title,) {

    }
    deleteNote(note_id) {

    }
}