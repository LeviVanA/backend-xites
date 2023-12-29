const {
    tables,
    getKnex
} = require('../data/index');

const getAllProjects = async () => {
    return getKnex()(tables.project)
        .select()
        .orderBy('id', 'ASC');
}

const getProjectIdByName = async (projectName) => {
    const project = await getKnex()(tables.project)
        .select('id')
        .where('naam', projectName)
        .first();

    if (!project) {
        throw new Error(`Project '${projectName}' not found.`);
    }

    return project.id;
};

module.exports = {
    getAllProjects,
    getProjectIdByName,
};