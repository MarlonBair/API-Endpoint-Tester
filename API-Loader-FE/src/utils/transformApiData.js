function transformApiData(apiData) {
    return Object.entries(apiData).flatMap(([className, methods]) =>
        Object.entries(methods).map(([name, { body }]) => ({
            className,
            name,
            body
        }))
    );
}

function transformClassData(classData, className) {
    return Object.entries(classData).map(([name, { body }]) => ({
        className: className,
        name,
        body
    }));
}

function transformNameData(className, name, body) {
    return [{
        className: className,
        name,
        body: body
    }, ];
}

export {transformApiData, transformClassData, transformNameData};