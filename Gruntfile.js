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
        arn: 'arn:aws:lambda:eu-west-1:365488455739:function:stage-twitter-oauth'
      },
      prod: {
        options: {
        region: 'eu-west-1'
      },
        arn: 'arn:aws:lambda:eu-west-1:365488455739:function:prod-twitter-oauth'
      }
    }
  })

  grunt.loadNpmTasks('grunt-aws-lambda')
  grunt.registerTask('default', ['lambda_package'])
  grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy:default']);
  grunt.registerTask('deploy_prod', ['lambda_package', 'lambda_deploy:prod']);
}
