const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const getCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data;
};

const createCategory = async (category) => {
    const { data, error } = await supabase.from('categories').insert([category]).select();
    if (error) throw error;
    return data[0];
};

const updateCategory = async (id, category) => {
    const { data, error } = await supabase.from('categories').update(category).eq('id', id).select();
    if (error) throw error;
    return data[0];
};

const deleteCategory = async (id) => {
    const { data, error } = await supabase.from('categories').delete().eq('id', id).select();
    if (error) throw error;
    return data[0];
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
