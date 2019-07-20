FROM ruby:2.5.5-slim
COPY . /application
WORKDIR /application
RUN gem install bundle
RUN bundle install 
ENV RAILS_ENV production
ENTRYPOINT [ "bundle exec rails server" ]