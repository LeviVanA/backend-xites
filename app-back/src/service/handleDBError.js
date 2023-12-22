const ServiceError = require('../core/serviceError');


const handleDBError = (error) => {
    const {
        code = '', sqlMessage
    } = error;


    if (code.startsWith('ER_NO_REFERENCED_ROW')) {
        switch (true) {
            case sqlMessage.includes('fk_Logging_User'):
                return ServiceError.notFound('This user does not exist');
            case sqlMessage.includes('fk_Logging_Dienst'):
                return ServiceError.notFound('This dienst does not exist');
            case sqlMessage.includes('fk_Logging_Project'):
                return ServiceError.notFound('This project does not exist');
        }
    }
    return error;
};

module.exports = handleDBError;