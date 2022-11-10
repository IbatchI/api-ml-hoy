import { Schema, model } from "mongoose"

export interface ISearch {
    keyword: string
    state: boolean
    user: Schema.Types.ObjectId
    wantedPrice: number
}

const SeachSchema = new Schema<ISearch>({
    keyword: {
        type: String,
        required: [true, 'La palabra clave es obligatoria'],
        unique: true
    },
    wantedPrice: {
        type: Number,
        default: 0
    },
    // This field is for soft delete
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

SeachSchema.methods.toJSON = function() {
    const { __v, _id, state, ...search } = this.toObject()
    search.uid = _id
    return search
}

export default model('Search', SeachSchema)