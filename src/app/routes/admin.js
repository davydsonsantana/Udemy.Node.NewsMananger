module.exports = function(application){
    
    application.get('/formulario_inclusao_noticia', function(req, res){
        res.render('admin/form_add_noticia', {news:{}, validation:{}});
    });

    application.post('/noticias/salvar', function(req, res){
        var news = req.body;        

        req.assert('titulo','Título é obrigatório').notEmpty();
        req.assert('resumo','Resumo é obrigatório').notEmpty();
        req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
        req.assert('autor','Autor é obrigatório').notEmpty();
        req.assert('data_noticia','Data é obrigatório').notEmpty();        
        req.assert('noticia','Noticia é obrigatória').notEmpty();

        var error = req.validationErrors();

        if(error){
            res.render('admin/form_add_noticia', {validation: error, news: news });
            return;
        }

        var connection = application.config.dbConnection();
        var noticiasDAO = new application.app.models.NoticiasDAO(connection);

        noticiasDAO.salvarNoticia(news, function(error, result){            
            res.redirect('/noticias');
        });       

    });

}