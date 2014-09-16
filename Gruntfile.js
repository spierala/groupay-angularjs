module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.initConfig({
	  compass: {                 
		dev: {                   
		  options: {
			sassDir: 'public/style/sass',
			cssDir: 'public/style/css'
		  }
		}
	  },
	  watch: {
       	compass: {
			files: ['**/*.{scss,sass}'],
			tasks: ['compass']
      	}
      }
	});

	grunt.registerTask('default', ['watch']);
}