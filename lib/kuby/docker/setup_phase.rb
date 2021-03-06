# typed: strict

module Kuby
  module Docker
    class SetupPhase < Layer
      extend T::Sig

      DEFAULT_WORKING_DIR = T.let('/usr/src/app'.freeze, String)

      sig { params(base_image: String).void }
      attr_writer :base_image

      sig { returns(T.nilable(String)) }
      attr_reader :working_dir

      sig { params(working_dir: String).void }
      attr_writer :working_dir

      sig { returns(T.nilable(String)) }
      attr_reader :rails_env

      sig { params(rails_env: String).void }
      attr_writer :rails_env

      sig { returns(T.nilable(Docker::Spec)) }
      attr_reader :docker_spec

      sig { params(environment: Environment, docker_spec: Docker::Spec).void }
      def initialize(environment, docker_spec)
        super(environment)

        @base_image = T.let(@base_image, T.nilable(String))
        @working_dir = T.let(@working_dir, T.nilable(String))
        @rails_env = T.let(@rails_env, T.nilable(String))
        @docker_spec = T.let(docker_spec, T.nilable(Docker::Spec))
      end

      sig { override.params(dockerfile: Dockerfile).void }
      def apply_to(dockerfile)
        dockerfile.from(base_image)
        dockerfile.workdir(working_dir || DEFAULT_WORKING_DIR)
        dockerfile.env("RAILS_ENV=#{rails_env || Kuby.env}")
        dockerfile.env("KUBY_ENV=#{Kuby.env}")
        dockerfile.arg('RAILS_MASTER_KEY')
      end

      sig { returns(String) }
      def base_image
        @base_image || default_base_image
      end

      private

      sig { returns(String) }
      def default_base_image
        spec = T.must(docker_spec)

        case spec.distro_name
          when :debian
            "ruby:#{RUBY_VERSION}"
          when :alpine
            "ruby:#{RUBY_VERSION}-alpine"
          else
            raise MissingDistroError, "distro '#{spec.distro_name}' hasn't been registered"
        end
      end
    end
  end
end
