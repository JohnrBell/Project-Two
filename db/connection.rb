require 'active_record'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 'postgres://localhost/d16e7ub767ulkn')

# require 'active_record'

# ActiveRecord::Base.establish_connection({
#   :adapter => "postgresql",
#   :database => "contact_list",
#   :host => "localhost",
#   :username => "john"
# })
# 
ActiveRecord::Base.logger = Logger.new(STDOUT)
