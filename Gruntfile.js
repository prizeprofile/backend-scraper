module.exports = (grunt) => {
  grunt.initConfig({
    lambda_invoke: {
      default: { options: {} }
    },
    lambda_package: {
      default: { options: {} }
    },
    lambda_deploy: {
      default: {
        options: {
          region: 'eu-west-1'
        },
        arn: 'arn:aws:lambda:eu-west-1:365488455739:function:stage-scraper-parse-tweets'
      },
      prod: {
        options: {
          region: 'eu-west-1'
        },
        arn: 'arn:aws:lambda:eu-west-1:365488455739:function:prod-scraper-parse-tweets'
      }
    }
  })

  grunt.loadNpmTasks('grunt-aws-lambda')
  grunt.registerTask('default', ['lambda_package'])
  grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy:default']);
  grunt.registerTask('deploy_prod', ['lambda_package', 'lambda_deploy:prod']);
}
