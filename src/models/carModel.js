const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const getCars = async (offset, limit, page) => {

    const { data: cars, error, count } = await supabase
        .from('cars')
        .select('*, categories (name)', { count: 'exact' })
        .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
        cars,
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit)
    };
};

const createCar = async (car) => {
    const { data, error } = await supabase.from('cars').insert([car]).select();
    if (error) throw error;
    return data;
};

const updateCar = async (id, car) => {
    const { data, error } = await supabase.from('cars').update(car).eq('id', id).select();
    if (error) throw error;
    return data;
};

const deleteCar = async (id) => {
    const { data, error } = await supabase.from('cars').delete().eq('id', id).select();
    if (error) throw error;
    return data;
};

module.exports = { getCars, createCar, updateCar, deleteCar };
